"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { useDictionary } from "./dictionary-provider"
import { FileText, Table, MonitorPlay, FileType } from "lucide-react"

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center space-x-2">
            {children}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export function ToolsMenu() {
  const dictionary = useDictionary()
  const pathname = usePathname()
  const currentLang = pathname.split('/')[1]

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            {dictionary.navigation.tools || "Tools"}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
              <ListItem
                href={`/${currentLang}/word`}
                title={dictionary.tools?.word || "Word Documents"}
              >
                <FileText className="h-4 w-4" />
              </ListItem>
              <ListItem
                href={`/${currentLang}/powerpoint`}
                title={dictionary.tools?.powerpoint || "PowerPoint Presentations"}
              >
                <MonitorPlay className="h-4 w-4" />
              </ListItem>
              <ListItem
                href={`/${currentLang}/excel`}
                title={dictionary.tools?.excel || "Excel Spreadsheets"}
              >
                <Table className="h-4 w-4" />
              </ListItem>
              <ListItem
                href={`/${currentLang}/pdf`}
                title={dictionary.tools?.pdf || "PDF Documents"}
              >
                <FileType className="h-4 w-4" />
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
