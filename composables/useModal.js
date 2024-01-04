const useModal = () => {
   const modal = useState("modal", () => {
      return {
         show: false,
         search: false,
         data: {
            label: "",
            items: null,
            icon: "",
            prefix: "",
         }
      }
   });


   const openModal = ({ search, label, items, icon, prefix }) => {
      modal.value.show = true;
      modal.value.search = search;
      modal.value.data.label = label;
      modal.value.data.items = items;
      modal.value.data.icon = icon;
      modal.value.data.prefix = prefix;
   }

   const closeModal = () => {
      modal.value.show = false;
      modal.value.search = false;
      modal.value.data.label = "";
      modal.value.data.items = [];
      modal.value.data.icon = "";
      modal.value.data.prefix = "";
   }

   return {
      modal,
      openModal,
      closeModal
   }
}

export default useModal;