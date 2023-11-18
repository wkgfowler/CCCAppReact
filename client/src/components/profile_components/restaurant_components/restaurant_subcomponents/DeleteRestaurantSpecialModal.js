import axios from "axios";
import { useAlert } from "react-alert";

const DeleteRestaurantSpecialModal = ({specialEvent, getAllSpecialsEvents}) => {

    const alert = useAlert();

    const deleteMenu = () => {
        axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/api/delete_specialEvent/${specialEvent.id}`, {
            headers: {
                "token" : localStorage.getItem("token")
            }
        })
        .then((response) => {
            alert.success("Successfully deleted.")
            getAllSpecialsEvents();
        }, (error) => {
            console.log(error)
            alert.error("Error deleting menu.")
        })
    }

    return (
        <div>
            <button type="button" className="bg-red-900 rounded px-2 py-1 text-white ml-5" data-toggle="modal" data-target={`#id${specialEvent.id}`}>
              <p>Delete</p>
            </button>

            <div className="modal" id={`id${specialEvent.id}`}>
              <div className="modal-dialog">
                <div className="modal-content bg-[#56707E] text-white">


                  <div className="modal-header">
                    <h4 className="modal-title">Are you sure you wish to delete the following {specialEvent.specialOrEvent === "special" ? "special" : "event"}?</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                  </div>


                  <div className="modal-body">
                    <p className="text-lg font-medium underline">{specialEvent.name}</p>
                    <p className="text-md">{specialEvent.description}</p>
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
 
export default DeleteRestaurantSpecialModal;