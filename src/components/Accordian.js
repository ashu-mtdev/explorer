import { Disclosure } from '@headlessui/react'
import { useState } from 'react';
// import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { FaAngleDown,FaAngleUp } from 'react-icons/fa'

export default function Accordian({item}) {
    const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="w-full px-0 pt-2 mt-4">
      <div className=" w-full shadow border rounded-2xl bg-white ">
        <Disclosure >
       <>
              <Disclosure.Button   onClick={()=>setIsOpen(!isOpen)} className="flex  w-full justify-between rounded-lg  px-6 py-4 text-left text-md font-medium text-black-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <span>{item?.question}</span>
              { !isOpen ? <FaAngleDown
                  className={`${
                    true ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-black-500`}
                />:
                <FaAngleUp
                  className={`${
                    true ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-black-500`}
                />
                }
              </Disclosure.Button>
              <Disclosure.Panel className={`px-4 pt-4 pb-2 text-md text-gray-500 `}>
               {item?.answer}
              </Disclosure.Panel>
            </>
          
        </Disclosure>
     
      </div>
    </div>
  )
}

// export default function Accordian({item}){
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="max-w-xs mx-auto mt-4">
//       <Disclosure open={isOpen} onChange={() => setIsOpen(!isOpen)}>
//         {({ open }) => (
//           <>
//             <Disclosure.Button className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-50">
//               {open ? "Hide Content" : "Show Content"}
//             </Disclosure.Button>
//             <Disclosure.Panel
//               as="div"
//               className={`${
//                 open ? "block" : "hidden"
//               } transition-all duration-700`}
//             >
//               <div className="p-4 mt-2 bg-gray-200 rounded-md">
//                 {/* Content inside the disclosure panel */}
//                 {/* Add your content here */}
//               </div>
//             </Disclosure.Panel>
//           </>
//         )}
//       </Disclosure>
//     </div>
//   );
// };
