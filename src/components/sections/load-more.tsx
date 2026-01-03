import React from 'react';

const LoadMore = () => {
  return (
    <section className="w-full flex justify-center py-[80px]">
      <div className="container flex flex-col items-center">
          <button
            className="
              cursor-pointer
              inline-flex
              items-center
              justify-center
              bg-ui-3
              hover:bg-ui-4
              text-text-primary
              font-semibold
              text-[12px]
              leading-none
              py-[10px]
              px-[25px]
              rounded-[10px]
              border
              border-border-1
              transition-all
              duration-200
              ease-in-out
            "
            type="button"
          >
            Load More
          </button>
        
        <div className="mt-12 w-full text-center">
          <p className="text-[#999999] text-[12px] font-normal leading-[1.6]">
            Website screenshots are copyright of their respective owners and are used for representational purpose only.{' '}
            <a 
              href="#" 
              className="text-[#e6633d] hover:underline"
            >
              Read disclaimer
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoadMore;