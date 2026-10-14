import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

let engine: FFmpeg | null = null;
let loading: Promise<FFmpeg> | null = null;

async function getEngine(onLog?: (message: string) => void) {
  if (engine?.loaded) return engine;
  if (!loading) {
    loading = (async () => {
      const ffmpeg = new FFmpeg();
      ffmpeg.on('log', ({ message }) => onLog?.(message));
      await ffmpeg.load({
        coreURL: await toBlobURL('/ffmpeg/ffmpeg-core.js', 'text/javascript'),
        wasmURL: await toBlobURL('/ffmpeg/ffmpeg-core.wasm', 'application/wasm'),
      });
      engine = ffmpeg;
      return ffmpeg;
    })();
  }
  return loading;
}

export async function exportMp4(file: File, start: number, end: number, muted: boolean, onLog?: (message: string) => void) {
  const ffmpeg = await getEngine(onLog);
  const input = `input-${Date.now()}.${file.name.split('.').pop() || 'mp4'}`;
  const output = `montara-${Date.now()}.mp4`;
  await ffmpeg.writeFile(input, await fetchFile(file));
  const args = ['-ss', String(Math.max(0, start)), '-to', String(Math.max(start + 0.01, end)), '-i', input, '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '22'];
  args.push(...(muted ? ['-an'] : ['-c:a', 'aac', '-b:a', '128k']), '-movflags', '+faststart', output);
  const code = await ffmpeg.exec(args);
  if (code !== 0) throw new Error(`FFmpeg exited with code ${code}`);
  const data = await ffmpeg.readFile(output);
  const bytes = typeof data === 'string' ? new TextEncoder().encode(data) : data;
  const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
  const blob = new Blob([buffer], { type: 'video/mp4' });
  await ffmpeg.deleteFile(input);
  await ffmpeg.deleteFile(output);
  return blob;
}
