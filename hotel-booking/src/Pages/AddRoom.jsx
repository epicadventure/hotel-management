// import React from 'react'
// import { assets } from '../assets/assets';

// const AddRoom = () => {

//     const [images, setImages] = useState({
//         1: null,
//         2: null,
//         3: null,
//         4: null
//     });

//     const [inputs, setInputs] = useState({
//         roomType: "",
//         amenities: {
//             'Free Wifi': false,
//             'Free Breakfast': false,
//             'Room Service': false,
//             'Mountain View': false,
//             'Pool Access': false,
//         },
//         pricePerNight: 0
       
//     });

//     return (
//        <form action="">
//         <Title align='left' font='outfit' title='Add New Room' subTitle='Fill in the details below to add a new room.' />
//         {/*Upload area for images*/}
//         <p className="text-gray-800 mt-10">Images</p>
//         <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
//         {Object.keys(images).map((key) => (
//             <label htmlFor={`roomImage${key}`} key={key}>
//                 <img className='max-h-13 cursor-pointer opacity-80' src={images[key]? URL.createObjectURL(images[key]) : assets.uploadArea} alt="" />
//                 <input type="file" accept='image/*' id={`roomImage${key}`} hidden onChange={(e) => setImages({...images, [key]:e.target.files[0]})} />
//             </label>
//         ))}
//         </div>
//        </form>
//     )
// }

// export default AddRoom
