const useGalleryModal = () => {
   const modal = useState('gallery', () => false);

   const openModal = () => {
      modal.value = true;
   }

   const closeModal = () => {
      modal.value = false;
   }


   return {
      modal,
      openModal,
      closeModal,
   }
}
export default useGalleryModal;