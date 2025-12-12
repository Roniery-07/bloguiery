type Rule = (value: unknown) => true | string;

abstract class BaseValidator<T>{
  protected rules : Rule[]= [];

  protected addRule(rule: Rule){
    this.rules.push(rule)
  }

  parse(value: unknown) : T{
    for(const rule of this.rules){
      const result = rule(value);
      if(result !== true){
        throw new Error(result);
      }
    }
    return value as T;
  }
}

export class StringValidator extends BaseValidator<string>{
  constructor(){
    super();
    this.addRule((val) => typeof val === 'string' || "Deve ser uma string!");
  }

  min(length : number, message?: string): this{
    this.addRule((val) => {
      if(typeof val !== 'string') return true;
      return val.length >= length || (message || `Mínimo de ${length} caracteres!`)
    });
    return this;
  }

  email(message?: string): this{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.addRule((val) => {
      if(typeof val !== 'string') return true;
      return emailRegex.test(val) || (message || "Email inválido!");
    })
    return this;
  }
}

type ValidatorShape = Record<string, BaseValidator<any>>;

type InferType<S extends ValidatorShape> = {
  [Key in keyof S]: S[Key] extends BaseValidator<infer U> ? U : never;
}

class ObjectValidator<S extends ValidatorShape> extends BaseValidator<InferType<S>>{
  private shape: S;
  constructor(shape: S){
    super();
    this.shape = shape;
    this.addRule((val) => {
      if(typeof val !== 'object' || val === null) return "Deve ser um object!";
      return true;
    })
  }

  parse(data: unknown): InferType<S>{
    super.parse(data);
    const result: any = {};
    const errors: string[] = [];
    const typedData = data as Record<string, unknown>;

    for (const key in this.shape){
      const validator = this.shape[key];
      const value = typedData[key]

      try{
        result[key] = validator.parse(value)
      } catch(error: any){
        errors.push(`${key}: ${error.message}`)
      }
    }
    if(errors.length > 0){
      throw new Error(errors.join(", "));
    }

    return result as InferType<S>;
  }
} 

class DateValidator extends BaseValidator<Date>{
  constructor() {
    super();
    this.addRule((val) => {
      const date = new Date(val as any);
      return !isNaN(date.getTime()) || "Data inválida!"
    })
  }

  parse(value: unknown): Date{
    super.parse(value);
    return new Date(value as any);
  }

  min(minDate: Date, message?: string): this {
    this.addRule((val) => {
      const d = new Date(val as any);
      return d >= minDate || (message || `A data deve ser posterior a ${minDate.toDateString()}!`)
    })
    return this
  }

  max(maxDate: Date, message?: string): this{
    this.addRule((val) => {
      const d = new Date(val as any);
      return d <= maxDate || (message || `A data deve ser anterior a ${maxDate.toISOString()}!`)
    })
    return this;
  }

}


export const validator = {
  string: () => new StringValidator(),
  object: <S extends ValidatorShape>(shape: S) => new ObjectValidator(shape),
  date: () => new DateValidator()
}

export type Infer<T extends BaseValidator<any>> = T extends BaseValidator<infer U> ? U : never;