import Link from "next/link"

export default function Menu({menu, key}) {
    return (
        <Link key={key} href={menu.href}>
            <li>{menu.name}</li>
            {
                menu.children && 1
            }
        </Link>
    )
}