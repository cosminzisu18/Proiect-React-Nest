import { IsString, IsBoolean, IsOptional, Length, IsUrl, IsNotEmpty, Matches, Validate  } from 'class-validator';
import { IsUrlOrLocalImagePath } from 'src/validators/image-validator';

export class PortfolioDto {
  // Validare pentru `title` pentru a limita lungimea și a evita caractere nepermise
  @IsString({ message: 'Titlul trebuie să fie un șir de caractere' })
  @IsNotEmpty({ message: 'Titlul este necesar' })
  @Length(5, 100, { message: 'Titlul trebuie să fie între 5 și 100 de caractere' })
  title: string;

  // Validare pentru `description`, limitând lungimea pentru a preveni abuzul
  @IsString({ message: 'Descrierea trebuie să fie un șir de caractere' })
  @IsNotEmpty({ message: 'Descrierea este necesară' })
  @Length(10, 500, { message: 'Descrierea trebuie să fie între 10 și 500 de caractere' })
  description: string;

  // Validare pentru `image`, asigurându-ne că este un URL valid
  @IsString({ message: 'Imaginea trebuie să fie un șir de caractere.' })
  @IsOptional()
  @Validate(IsUrlOrLocalImagePath)
  image?: string;

  // Validare pentru `clientLink`, verificând că este un URL și că are un format corespunzător
  @IsString({ message: 'Client link trebuie să fie un șir de caractere' })
  @IsNotEmpty({ message: 'Link-ul clientului este necesar' })
  @Matches(/^(http:\/\/|https:\/\/)/, { message: 'Link-ul clientului trebuie să înceapă cu http:// sau https://' })
  clientLink: string;

  // Validare pentru `status`, asigurându-ne că este boolean (true: afișat, false: ascuns)
  status: boolean; // true: afișat, false: ascuns
}
