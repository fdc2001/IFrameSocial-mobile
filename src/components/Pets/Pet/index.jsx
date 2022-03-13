import  {Backpack, Browser, CreditCard, Cat, File, Folder, Ghost, IceCream, Mug, Planet, SpeechBubble} from 'react-kawaii/lib/native/';

const Pet = ({pet="Cat", size = 200, mood="blissful", color="#E0E4E8"}) => {
    mood= mood.toLowerCase();
    pet= pet.toLowerCase();
    switch (pet){
      case "backpack":
        return <Backpack size={size} mood={mood} color={color}/>
      case "browser":
        return <Browser size={size} mood={mood} color={color}/>
      case "cat":
        return <Cat size={size} mood={mood} color={color}/>
      case "creditcard":
        return <CreditCard size={size} mood={mood} color={color}/>
      case "file":
        return <File size={size} mood={mood} color={color}/>
      case "folder":
        return <Folder size={size} mood={mood} color={color}/>
      case "ghost":
        return <Ghost size={size} mood={mood} color={color}/>
      case "iceCream":
        return <IceCream size={size} mood={mood} color={color}/>
      case "mug":
        return <Mug size={(size-25)} mood={mood} color={color}/>
      case "planet":
        return <Planet size={size} mood={mood} color={color}/>
      case "speechBubble":
        return <SpeechBubble size={size} mood={mood} color={color}/>
      default:
        return <Backpack size={size} mood={mood} color={color}/>
    }
};
export default Pet;