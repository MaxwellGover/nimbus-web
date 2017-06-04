export function formatFileName (file) {
  let array = file.split('.');
  let songName = array[0];
  return songName;
}
