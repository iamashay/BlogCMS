import { UserIcon } from "./SVG"
import Image
 from "next/image"
export default function UserBox() {
    return (
        <span className="self-center">
            <UserIcon title="User"  />
        </span>
    )
}