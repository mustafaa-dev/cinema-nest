import ffmpeg from 'fluent-ffmpeg';
import { Readable, Writable } from 'stream';
import * as path from 'path';

async function compressAndAddWatermark(
  inputStream: Readable,
  outputStream: Writable,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const watermarkPath = path.join(__dir, '..', 'wm.png');
    const compressionOptions = {
      videoBitrate: '500k', // Adjust as needed
      audioBitrate: '128k', // Adjust as needed
    };

    ffmpeg(inputStream)
      .inputFormat('mp4')
      .videoCodec('libx264')
      .audioCodec('aac')
      .videoBitrate(compressionOptions.videoBitrate)
      .audioBitrate(compressionOptions.audioBitrate)
      .on('error', (err) => {
        console.error('Error:', err);
        reject(err);
      })
      .on('end', () => {
        console.log('Processing finished successfully');
        resolve();
      })
      .input(watermarkPath) // Add the watermark
      .videoFilter(
        'movie=' +
          watermarkPath +
          ' [watermark]; [in][watermark] overlay=W-w-10:H-h-10 [out]',
      )
      .pipe(outputStream, { end: true });
  });
}

// Example usage
const inputFileStream = fs.createReadStream('/path/to/your/input-video.mp4');
const outputFileStream = fs.createWriteStream('/path/to/your/output-video.mp4');

compressAndAddWatermark(inputFileStream, outputFileStream)
  .then(() => console.log('Compression and watermarking complete'))
  .catch((error) => console.error('Error:', error));
