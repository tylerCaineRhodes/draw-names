class NameDrawer {
  #results;
  #args;

  static DEFAULTLIST = [
    'Dan',
    'Tyler',
    'Steve',
    'Karen',
    'Jeff',
    'Richard',
    'Susan',
  ].map((str) => str.toLowerCase());

  static NOT_PERMITTED = {
    steve: ['karen'],
    karen: ['steve'],
    susan: ['isaac', 'lucia'],
    richard: ['jeff'],
    jeff: ['richard'],
  };

  constructor(args) {
    this.#results = {};

    if (args) {
      this.#args = args;
    } else {
      this.#args =
        process.argv.slice(2).length > 0
          ? process.argv.slice(2).map((str) => str.toLowerCase())
          : NameDrawer.DEFAULTLIST;
    }
  }

  assignNames() {
    if (this.#args.length < 2) {
      return console.log('Please provide at least 2 names');
    }

    const shuffledList = this.#shuffle(this.#args);
    const { length } = shuffledList;

    for (let i = 0; i < length; i++) {
      this.#results[shuffledList[i]] = shuffledList[(i + 1) % length];
      const forbiddenSelections = NameDrawer.NOT_PERMITTED[shuffledList[i]];
      if (forbiddenSelections?.includes(this.#results[shuffledList[i]])) {
        console.log(
          `${shuffledList[i]} cannot draw ${forbiddenSelections.join(
            ', '
          )}. Re-assigning...`.toUpperCase()
        );
        this.#results = {};
        return this.assignNames();
      }
    }
    return this;
  }

  toString() {
    console.log(
      Object.entries(this.#results).reduce(
        (acc, [person1, person2]) => acc + `${person1} draws ${person2}\n`,
        ''
      )
    );
    return this;
  }

  #shuffle(array) {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * array.length);
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
const newNameDrawer = new NameDrawer();
newNameDrawer.assignNames()?.toString();
