
function imageDef(url, size) {
  return {
    src: url ?? '/img/fav/apple-icon.png',
    sizes: size,
    type: 'image/png'
  }
}

  try {
const evtSource = new EventSource("https://api.zeno.fm/mounts/metadata/subscribe/2pelvwye4cctv");
evtSource.onmessage = (event) => {
let title = JSON.parse(event.data).streamTitle;
document.getElementById('track-title').innerText = title.split(' - ')[1];
document.getElementById('track-author').innerText = '- '+title.split(' - ')[0];
document.title = `${title} | Rádio Gospel - radiosoundfm.com.br`;

fetch(`https://fsh-api.onrender.com/file?url=https://api.deezer.com/search?q=${encodeURIComponent(title)}&output=json`)
  .then(res => res.json())
  .then(re => {
    if (!re.data[0]) {
      document.getElementById('track-cover').src = '/img/fav/apple-icon.png';
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: title.split(' - ')[1],
          artist: title.split(' - ')[0],
          artwork: []
        });
      }
      return;
    }
    res = re.data.filter(e=>e.title.includes(title.split(' - ')[1].split(' ')[0]))[0];
    if (!res) res = re.data[0];
    document.getElementById('track-title').innerText = res.title;
    document.title = `${res.title_short} | Rádio Gospel - radiosoundfm.com.br`;
    document.getElementById('track-author').innerText = ''+res.artist.name;
    document.getElementById('track-cover').src = res.album.cover ?? '/img/fav/apple-icon.png';

    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: res.title,
        artist: res.artist.name,
        artwork: [
          imageDef(res.album.cover, '96x96'),
          imageDef(res.album.cover, '128x128'),
          imageDef(res.album.cover, '192x192'),
          imageDef(res.album.cover, '256x256'),
          imageDef(res.album.cover, '384x384'),
          imageDef(res.album.cover, '512x512')
        ]
      });
    }
  })
};
} catch (err) {
document.getElementById('track-title').innerText = 'Could not load';
}
