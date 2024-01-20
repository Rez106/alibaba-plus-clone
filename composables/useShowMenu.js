const useShowMenu = () => {
   const { y } = useWindowScroll();
   const isShown = useState('menu', () => true)

   watch(y, (newVal, oldVal) => {
      if (newVal > oldVal) return (isShown.value = false);
      else return (isShown.value = true);
   });

   return {
      isShown
   };
}

export default useShowMenu;