export class ImageUtil {
  static prepareUrl(type: string, imageId: string): string {
    return `${process.env.APP_URL}/images/${type}/${imageId}`;
  }
}
