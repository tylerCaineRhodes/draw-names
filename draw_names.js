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
  ];

  constructor() {
    this.#results = {};
    this.#args =
      process.argv.slice(2).length > 0
        ? process.argv.slice(2)
        : NameDrawer.DEFAULTLIST;
  }

  assignNames() {
    if (this.#args.length < 2) {
      return console.log('Please provide at least 2 names');
    }
    this._shuffle(this.#args).forEach((person) => this._draw(person));
    if (Object.values(this.#results).includes(undefined)) {
      this._swapUndefinedAssignment();
    }
    return this;
  }

  _swapUndefinedAssignment() {
    Object.keys(this.#results).forEach((key, i, array) => {
      if (this.#results[key]) return;
      const prevKey = array[i - 1];
      const prevValue = this.#results[prevKey];
      this.#results[prevKey] = key;
      this.#results[key] = prevValue;
    });
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

  _shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  _draw(person) {
    const tempList = this._namesLeftFor(person);
    const otherPerson = tempList[Math.floor(Math.random() * tempList.length)];
    this.#results[person] = otherPerson;
  }

  _namesLeftFor(person) {
    return this.#args
      .filter((p) => p !== person)
      .filter((p) => Object.values(this.#results).includes(p) === false);
  }
}
const newNameDrawer = new NameDrawer();
newNameDrawer.assignNames()?.toString();
