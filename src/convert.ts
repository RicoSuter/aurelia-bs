declare var Reflect: any;

export let StringConverter = (value: any) => {
  if (value === null || value === undefined || typeof value === 'string')
    return value;

  return value.toString();
};

export let BooleanConverter = (value: any) => {
  if (value === null || value === undefined || typeof value === 'boolean')
    return value;

  return value.toString() === 'true';
};

export let NumberConverter = (value: any) => {
  if (value === null || value === undefined || typeof value === 'number')
    return value;

  return parseFloat(value.toString());
};

export function convert(converter?: (value: any) => any) {
  return (target: Object, key: string) => {
    if (converter === undefined) {
      if (!Reflect)
        throw new Error('The Reflect API is not available.');

      let metadata = Reflect.getMetadata ? Reflect.getMetadata('design:type', target, key) :
        Reflect.getOwnMetadata ? Reflect.getOwnMetadata('design:type', target, key) : undefined;

      if (metadata === undefined || metadata === null)
        throw new Error('The reflection metadata could not be found.');

      if (metadata.name === 'String')
        converter = StringConverter;
      else if (metadata.name === 'Boolean')
        converter = BooleanConverter;
      else if (metadata.name === 'Number')
        converter = NumberConverter;
      else
        throw new Error('There is no converter for the given property type \'' + metadata.name + '\'.');
    }

    // let definition: PropertyDescriptor | undefined = undefined;
    // let searchingTarget = target;
    // while (!definition && searchingTarget) {
    //     definition = Object.getOwnPropertyDescriptor(searchingTarget, key);
    //     searchingTarget = Object.getPrototypeOf(searchingTarget);
    // }
    // debugger;

    let definition = Object.getOwnPropertyDescriptor(target, key);
    if (definition) {
      Object.defineProperty(target, key, {
        get: definition.get,
        set: newValue => {
          definition!.set!(converter!(newValue));
        },
        enumerable: true,
        configurable: true
      });
    } else {
      Object.defineProperty(target, key, {
        get: function () {
          return this['__' + key];
        },
        set: function (newValue) {
          this['__' + key] = converter!(newValue);
        },
        enumerable: true,
        configurable: true
      });
    }
  };
}
