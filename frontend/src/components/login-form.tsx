import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { InputForm } from "@/components/input-form" // or wherever InputForm is

type CardProps = React.ComponentProps<typeof Card>

export function LoginForm({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-full max-w-md mx-auto", className)} {...props}>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your username and password to continue</CardDescription>
      </CardHeader>

      <CardContent>
        <InputForm />
      </CardContent>

      <CardFooter className="text-sm text-muted-foreground justify-center">
        Good to Go!
      </CardFooter>
    </Card>
  )
}
