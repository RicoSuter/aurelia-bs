export class Scroll {
  randomData: string[] = [];

  constructor() {
    for (let i = 0; i < 100; i++) {
      this.randomData.push('Item ' + (i + 1));
    }
  }
}