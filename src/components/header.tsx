import Logo from "../public/logo.svg";
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; 
import localeData from 'dayjs/plugin/localeData'; 
import Image from 'next/image';

dayjs.extend(localeData);
dayjs.locale('pt-br');

export function Header() {
  const formattedDate = dayjs().format('dddd, DD [de] MMMM [de] YYYY');

  return (
    <header className="flex  items-end justify-between flex-wrap w-full px-4 sm:flex-col sm:items-start h- max-h-[200px] sm:border-none border-b-[1px] border-gray-500" style={{ maxWidth: '1440px', margin: '0 auto' }}>
      <div className="flex-shrink-0">
        <Image 
          className="w-[15rem] h-[3.6rem] sm:w-[10rem] sm:h-[2.6rem]" 
          src={Logo} 
          alt="Logo" 
          width={150} 
          height={36} 
          priority 
        />
      </div>

      <h1 className="text-[#000] font-roboto text-3xl font-medium sm:text-xl text-center sm:text-left">
        Bem-vinda de volta, Danilo!
      </h1>

      <p className="text-gray-500 font-roboto text-xl font-normal sm:text-lg text-center sm:text-left">
        {formattedDate}
      </p>
    </header>
  );
}
