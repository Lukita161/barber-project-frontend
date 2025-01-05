import Image from "next/image"
import GoBackArrowIcon from '@/src/assets/icons/GoBackArrow.svg'

export const GoBackArrow = ()=> {
    return (
        <Image height={30} width={30} src={GoBackArrowIcon} alt="Icon de flecha" />
    )
}