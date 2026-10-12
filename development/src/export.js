// ZIP ohne Kompression: zwei Textdateien, CRC32 und UTF-8, ohne Bibliotheken.
export function zipFiles(files) {
  const enc = new TextEncoder(),
    chunks = [],
    entries = [];
  let offset = 0;
  const crc32 = (bytes) => {
    let c = 0xffffffff;
    for (const b of bytes) {
      c ^= b;
      for (let i = 0; i < 8; i++) c = (c >>> 1) ^ (c & 1 ? 0xedb88320 : 0);
    }
    return (c ^ 0xffffffff) >>> 0;
  };
  const header = (size, fields) => {
    const b = new Uint8Array(size),
      v = new DataView(b.buffer);
    for (const [pos, value, bits] of fields)
      bits === 16
        ? v.setUint16(pos, value, true)
        : v.setUint32(pos, value, true);
    return b;
  };
  for (const [name, text] of Object.entries(files)) {
    const n = enc.encode(name),
      data = enc.encode(text),
      crc = crc32(data);
    const local = header(30, [
      [0, 0x04034b50, 32],
      [4, 20, 16],
      [6, 0x800, 16],
      [10, 0, 16],
      [12, 33, 16],
      [14, crc, 32],
      [18, data.length, 32],
      [22, data.length, 32],
      [26, n.length, 16],
    ]);
    chunks.push(local, n, data);
    entries.push(
      header(46, [
        [0, 0x02014b50, 32],
        [4, 20, 16],
        [6, 20, 16],
        [8, 0x800, 16],
        [14, 33, 16],
        [16, crc, 32],
        [20, data.length, 32],
        [24, data.length, 32],
        [28, n.length, 16],
        [42, offset, 32],
      ]),
      n,
    );
    offset += local.length + n.length + data.length;
  }
  const centralSize = entries.reduce((n, b) => n + b.length, 0);
  const end = header(22, [
    [0, 0x06054b50, 32],
    [8, Object.keys(files).length, 16],
    [10, Object.keys(files).length, 16],
    [12, centralSize, 32],
    [16, offset, 32],
  ]);
  return new Blob([...chunks, ...entries, end], { type: "application/zip" });
}
