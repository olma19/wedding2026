/**
 * Parse "Artist - Title" song string into display parts.
 * If no " - " separator, returns { artist: '', title: song }.
 */
export function parseSongDisplay(song: string): { artist: string; title: string } {
  const sep = ' - '
  const i = song.indexOf(sep)
  if (i === -1) return { artist: '', title: song }
  return {
    artist: song.slice(0, i).trim(),
    title: song.slice(i + sep.length).trim(),
  }
}
