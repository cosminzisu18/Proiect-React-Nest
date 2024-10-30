import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isUrlOrLocalImagePath', async: false })
export class IsUrlOrLocalImagePath implements ValidatorConstraintInterface {
  validate(image: string, args: ValidationArguments) {
    // Verifică dacă este un URL valid (http sau https) sau începe cu http://localhost
    const isUrl = /^(http|https):\/\/[^ "]+$/.test(image) || /^http:\/\/localhost\/[^ "]+$/.test(image);

    // Verifică dacă este un hash de imagine valid cu extensiile specificate
    const isLocalImagePath = /^[a-f0-9]{32}(\.jpg|\.jpeg|\.png|\.gif)?$/.test(image);
    
    return isUrl || isLocalImagePath;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Imaginea trebuie să fie fie un URL valid (începând cu http:// sau https://, inclusiv http://localhost), fie un hash valid de imagine de 32 de caractere hexazecimale cu extensiile .jpg, .jpeg, .png, .gif';
  }
}
