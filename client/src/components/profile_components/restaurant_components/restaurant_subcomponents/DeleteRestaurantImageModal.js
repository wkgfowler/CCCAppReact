import axios from 'axios';
import { FaWindowClose } from 'react-icons/fa'

const DeleteRestaurantImageModal = ({image, getRestaurant, alert}) => {

    const deleteImage = () => {
        axios.delete(`http://localhost:3000/api/restaurantImages/${image.id}`, {
            headers: {
                "token" : localStorage.getItem("token")
            }
        })
        .then((response) => {
            alert.success("Image successfully deleted.")
            getRestaurant();
        }, (error) => {
            console.log(error)
            alert.error("Error deleting image.")
        })
    }

    return (  
        <div>
            <button type="button" className="absolute cursor-pointer text-3xl" data-toggle="modal" data-target={`#id${image.id}`}>
              <FaWindowClose />
            </button>

            <div className="modal" id={`id${image.id}`}>
              <div className="modal-dialog">
                <div className="modal-content bg-[#56707E] text-white">


                  <div className="modal-header">
                    <h4 className="modal-title">Are you sure you wish to delete the following photo?</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                  </div>


                  <div className="modal-body">
                    <img src={`http://localhost:3000/${image.image}`} alt="error" className="w-1/2 h-1/2"/>
                  </div>


                  <div className="modal-footer">
                    <button type="button" className="bg-white text-black rounded px-2 py-1" data-dismiss="modal" onClick={deleteImage}>Yes</button>
                    <button type="button" className="bg-white text-black rounded px-2 py-1" data-dismiss="modal" >No</button>
                  </div>

                </div>
              </div>
            </div>
        </div>
    );
}
 
export default DeleteRestaurantImageModal;