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
    <header className="flex  items-end justify-between flex-wrap w-full p-4 sm:flex-col sm:items-start h-auto sm:border-none border-b-[1px] border-gray-500" style={{ maxWidth: '1440px', margin: '0 auto' }}>
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

      <h1 className="text-[#000] font-roboto text-4xl font-medium sm:text-3xl text-center sm:text-left">
        Bem-vinda de volta, Danilo!
      </h1>

      <p className="text-[rgba(0, 0, 0, 0.54)] font-roboto text-2xl font-normal sm:text-lg text-center sm:text-left">
        {formattedDate}
      </p>
    </header>
  );
}
