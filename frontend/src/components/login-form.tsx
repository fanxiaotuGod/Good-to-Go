import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LoginForm } from "@/components/input-form" // or wherever InputForm is

type CardProps = React.ComponentProps<typeof Card>

export function CardDemo({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-full max-w-md mx-auto", className)} {...props}>

      <CardContent>
        <LoginForm />
      </CardContent>

      <CardFooter className="text-sm text-muted-foreground justify-center">
        for youCode 2025
      </CardFooter>
    </Card>
  )
}
