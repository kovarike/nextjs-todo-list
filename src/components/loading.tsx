export function Loading(){
    return(
        <div className="fixed inset-0 bg-white opacity-95 flex flex-1 flex-col items-center justify-center z-40">
            <div  className="max-w-[400px] w-[400px] p-5 mx-auto shadow-shadow bg-white rounded-xl space-y-4  ">
                <h1 className='text-center text-white bg-button w-full'>Carregando...</h1>

            </div>
        </div>

    );
}