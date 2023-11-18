import axios from "axios";
import { FaWindowClose } from 'react-icons/fa'
import { useAlert } from "react-alert";

const DeleteRestaurantMenuModal = ({menu, getSpecificMenu}) => {

    const alert = useAlert();

    const deleteMenu = () => {
        axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/api/restaurantMenu/${menu.id}`, {
            headers: {
                "token" : localStorage.getItem("token")
            }
        })
        .then((response) => {
            alert.success("Menu successfully deleted.")
            getSpecificMenu();
        }, (error) => {
            console.log(error)
            alert.error("Error deleting menu.")
        })
    }

    return (
        <div>
            <button type="button" className="absolute cursor-pointer text-3xl" data-toggle="modal" data-target={`#id${menu.id}`}>
              <FaWindowClose className="text-red-700"/>
            </button>

            <div className="modal" id={`id${menu.id}`}>
              <div className="modal-dialog">
                <div className="modal-content bg-[#56707E] text-white">


                  <div className="modal-header">
                    <h4 className="modal-title">Are you sure you wish to delete the following menu?</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                  </div>


                  <div className="modal-body">
                    <img src={`${process.env.REACT_APP_API_ENDPOINT}/${menu.menuImage}`} alt="error" className="w-1/2 h-1/2"/>
                  </div>


                  <div className="modal-footer">
                    <button type="button" className="bg-white text-black rounded px-2 py-1" data-dismiss="modal" onClick={deleteMenu}>Yes</button>
                    <button type="button" className="bg-white text-black rounded px-2 py-1" data-dismiss="modal" >No</button>
                  </div>

                </div>
              </div>
            </div>
        </div>
    );
}
 
export default DeleteRestaurantMenuModal;