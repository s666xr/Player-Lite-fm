var aud = new Audio;
$(document).on(
  'click',
  '.play',
  function () {
    let a = $(this).attr('url');
    playURL(a)
  }
),
$(document).on(
  'click',
  '.pause',
  function () {
    return pause(),
    $('.pause').html(
      '<img src="/img/ic/bt/play.svg" alt="Play" title="Play" width="50" height="50">'
    ),
    $('.pause').attr('class', 'play'),
    !1
  }
),
aud.onerror = function () {
  if (
    'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAVFYAAFRWAAABAAgAZGF0YQAAAAA=' == aud.src
  ) return !1;
  switch (
      myErrHandler(
        'player error ' + aud.error.code,
        window.location.href,
        0,
        0,
        aud.error,
        'player'
      ),
      aud.error.code
    ) {
    case aud.error.MEDIA_ERR_ABORTED:
      alert('Playback interrupted by user.');
      break;
    case aud.error.MEDIA_ERR_NETWORK:
      alert('Network error, loading media file is stopped.');
      break;
    case aud.error.MEDIA_ERR_DECODE:
      alert(
        'The playback of the media file is interrupted due to the presence in it of elements which cannot be decoded by the browser.'
      );
      break;
    case aud.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
      alert(
        'Media file can not be downloaded because of a server error or a network, or the media format is not supported.'
      );
      break;
    default:
      alert('An unknown error has occurred');
  }
  $('.load').html(
    '<img src="/img/ic/bt/play.svg" alt="Play" title="Play" width="50" height="50">'
  ),
  $('.load').attr('class', 'play')
},
aud.onemptied = function () {
  $('.pause').html(
    '<img src="/img/ic/bt/load.svg" width="50" height="50">'
  ),
  $('.pause').attr('class', 'load')
},
aud.oncanplaythrough = function () {
  $('.load').html(
    '<img src="/img/ic/bt/pause.svg" alt="Pause" title="Pause" width="50" height="50">'
  ),
  $('.load').attr('class', 'pause')
},
aud.onplaying = function () {
  $('.load').html(
    '<img src="/img/ic/bt/pause.svg" alt="Pause" title="Pause" width="50" height="50">'
  ),
  $('.load').attr('class', 'pause')
},
aud.onplay = function () {
  $('.play').html(
    '<img src="/img/ic/bt/load.svg" width="50" height="50">'
  ),
  $('.play').attr('class', 'load')
};
function range(a) {
  volume = a.value,
  aud.volume = volume,
  $('.range').css({
    background: '-webkit-linear-gradient(left ,#767676 0%,#767676 ' + 100 * volume + '%,#fff ' + 100 * volume + '%, #fff 100%)'
  }),
  aud.muted &&
  (
    aud.muted = !1,
    $('.img-mute').attr('src', '/img/ic/bt/stereo.svg'),
    $('.img-mute').attr('class', 'img-stereo')
  )
}
$(document).on(
  'click',
  '.img-stereo',
  function () {
    return aud.muted = !0,
    $('.img-stereo').attr('src', '/img/ic/bt/mute.svg'),
    $('.img-stereo').attr('class', 'img-mute'),
    !1
  }
),
$(document).on(
  'click',
  '.img-mute',
  function () {
    return aud.muted = !1,
    $('.img-mute').attr('src', '/img/ic/bt/stereo.svg'),
    $('.img-mute').attr('class', 'img-stereo'),
    !1
  }
);
function playURL(a) {
  stop(),
  aud.src = a,
  play(),
  aud.volume = document.querySelector('input[type=range]').value
}
function play() {
  aud.load(),
  $('.play').html(
    '<img src="/img/ic/bt/load.svg" width="50" height="50">'
  ),
  $('.play').attr('class', 'load'),
  setTimeout(function () {
    aud.play()
  }, 3000)
}
function pause() {
  aud.pause(),
  aud.src = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAVFYAAFRWAAABAAgAZGF0YQAAAAA='
}
function stop() {
  pause()
}
