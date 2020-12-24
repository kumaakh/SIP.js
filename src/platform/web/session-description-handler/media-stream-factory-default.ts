import { MediaStreamFactory } from "./media-stream-factory";

/**
 * Function which returns a MediaStreamFactory.
 * @public
 */
export function defaultMediaStreamFactory(): MediaStreamFactory {
  return (constraints: MediaStreamConstraints): Promise<MediaStream> => {
    // if no audio or video, return a media stream without tracks
    if (!constraints.audio && !constraints.video) {
      return Promise.resolve(new MediaStream());
    }
    // getUserMedia() is a powerful feature which can only be used in secure contexts; in insecure contexts,
    // navigator.mediaDevices is undefined, preventing access to getUserMedia(). A secure context is, in short,
    // a page loaded using HTTPS or the file:/// URL scheme, or a page loaded from localhost.
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Privacy_and_security
    if (navigator.mediaDevices === undefined) {
      return Promise.reject(new Error("Media devices not available in insecure contexts."));
    }

    return navigator.mediaDevices
      .enumerateDevices()
      .then((devicesArr) => {
        const deviceName = "BluB0x - Virtual Camera";
        const webCams = devicesArr.filter(
          (d) => d.kind === "videoinput" && (!deviceName || (!!deviceName && d.label === deviceName))
        );
        if (webCams.length === 1) {
          return webCams[0].deviceId;
        } else {
          const message = webCams.length
            ? "More than one camera found for given name"
            : "BluB0x - Virtual Camera not found";
          return Promise.reject(new Error(message));
        }
      })
      .then((deviceId) => {
        constraints.video = {
          deviceId: { exact: deviceId }
        };
        return navigator.mediaDevices.getUserMedia.call(navigator.mediaDevices, constraints);
      });
  };
}
