"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

const NavLink = (props: ComponentProps<typeof Link>) => {
  const pathname = usePathname();
  const paths = pathname.split("/");

  return (
    <Link
      {...props}
      href={props.href}
      className={cn(
        "flex items-center gap-4 rounded-[10px] border border-transparent px-4 py-2 hover:border hover:border-primary-orange hover:bg-secondary-yellow hover:text-primary-orange",
        props.className,
        paths[1] === String(props.href).slice(1) && "border border-primary-orange bg-secondary-yellow text-primary-orange",
      )}
    />
  );
};

export default NavLink;
