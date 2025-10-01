import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import 'remixicon/fonts/remixicon.css';

function App() {
  const ref = useRef();
  const [ShowContent, setShowContent] = useState(false);

  useGSAP(()=>{
    const tl = gsap.timeline();
    tl.to(ref.current, {
      rotate: 10,
      duration: 2,
      transformOrigin: "50% 50%",
      ease: "Power4.easeInOut",
    })
      .to(ref.current, {
        scale: 10,
        duration: 2,
        delay: -1.8,
        ease: "Expo.easeInOut",
        transformOrigin: "50% 50%",
        opacity: 0,
        onUpdate: function() {
          if (this.progress() >= .9) {
            document.querySelector(".svg").remove();
            setShowContent(true);
            this.kill();
          };
        }
      });
  });

  useGSAP(()=>{
    if(!ShowContent) return;
    gsap.to(".main",{
      scale:1,
      rotate:0,
      ease:"Expo.easeInOut",
      duration:2,
      delay:"-1"
    });
    gsap.to(".sky",{
      scale:1.1,
      rotate:0,
      ease:"Expo.easeInOut",
      duration:2,
      delay:"-.8"
    });
    gsap.to(".bg",{
      scale:1.2,
      rotate:0,
      ease:"Expo.easeInOut",
      duration:2,
      delay:"-.8"
    });
    gsap.to(".text",{
      scale:1,
      x:"0%",
      rotate:0,
      ease:"Expo.easeInOut",
      duration:2,
      delay:"-.8"
    });
    gsap.to(".character",{
      scale:0.7,
      x:"-50%",
      bottom:"-75%",
      rotate:0,
      ease:"Expo.easeInOut",
      duration:2,
      delay:"-.8"
    });
    const main = document.querySelector(".main");
    main?.addEventListener("mousemove",(e)=>{
      const XMove = (e.clientX/window.innerWidth-0.5) * 40;
      gsap.to(".ImageDiv .text",{
        x:`${XMove*0.4}`,
        transformOrigin: "50% 50%"
      })
      gsap.to(".sky",{
        x:XMove
      })
      gsap.to(".bg",{
        x:XMove*1.7
      })
    });
  },[ShowContent]);

  return (
    <>
      <div className="svg fixed cursor-none top-0 left-0 overflow-hidden w-full h-screen">
        <svg
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
        >
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="Mask-group" ref={ref}>
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  fill="#fff"
                  dominantBaseline="middle"
                  fontSize="250"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>

          <rect width="100%" height="100%" fill="#000" />

          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {ShowContent && (
        <>
          <div className="navbar fixed z-20 rounded-2xl top-4 left-1/2 -translate-x-1/2 backdrop-blur-sm bg-zinc-800/50 w-[50%] h-[11vb]">
                <div className="logo relative top-[50%] -translate-y-[50%] left-5">
                  <h3 className="text-white/80 selection:text-amber-500 text-3xl font-bold">Rockstar</h3>
                </div>
            </div>
          <div className="main relative w-full scale-[1.7] rotate-[-10deg] selection:text-amber-500/99">

            <div className="landing overflow-hidden w-full h-screen bg-black relative">

              <div className="ImageDiv overflow-hidden relative w-full h-full">
                <img className="absolute select-none sky rotate-[-10deg] left-0 top-0 h-full scale-[1.5] w-full object-cover z-0" src="./sky.png" />
                <img className="absolute select-none bg left-0 top-0 h-full w-full scale-[1.8] object-cover z-0" src="./bg.png" />
                <div className="text absolute leading-none scale-[1.4] rotate-[-10deg] z-0 top-2 left-[45%] flex flex-col gap-3 -translate-x-[55%] text-9xl text-white/98">
                  <h1 className="-ml-40">grand</h1>
                  <h1 className="ml-20">theft</h1>
                  <h1 className="-ml-40">auto</h1>
                </div>
                <img
                  className="absolute select-none character -bottom-[150%] left-1/2 -translate-x-[50%] scale-[3] rotate-[-20deg] z-0"
                  src="./girlbg.png"
                />
              </div>
              
              <div className="btmbaar select-none overflow-hidden text-white absolute bottom-0 left-0 w-full py-10 px-10 bg-gradient-to-t from-black to-transparent">
                <div className="flex gap-4 items-center">
                  <i className="text-3xl ri-arrow-down-line"></i>
                  <h3 className="text-lg font-[monospace]">Scroll down</h3>
                </div>
                <img className="h-12 absolute top-1/2 left-1/2 -translate-x-1/2" src="./ps5.png" />
              </div>
            </div>

            <div className="relative z-0 w-full h-screen flex items-center justify-center overflow-hidden px-10 bg-black">
              <div className="w-full relative flex items-center top-0 h-[80%]">
                <img src="./imag.png" className="scale-[1] select-none" alt="" />
                <div className="text-white text-8xl">
                  <span className="flex flex-nowrap gap-5"><h1 className="text-amber-500 selection:text-white">Still</h1><h1>Running,</h1></span>
                  <span className="flex flex-nowrap gap-5"><h1>Not</h1><h1 className="text-amber-500 selection:text-white">Hunting</h1></span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
    
  );
}

export default App;