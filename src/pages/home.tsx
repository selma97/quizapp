import { homeSchema, type homeSchemaValues } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import categories from "@/data/categories";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Activity, ListTree, User } from "lucide-react";

interface HomeProps {
  name: string;
  setName: (name: string) => void;
  fetchQuestions: (category: string, difficulty: string) => void;
  setQuestions: (q: any[]) => void;
}

const Home = ({ name, setName, fetchQuestions, setQuestions }: HomeProps) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const form = useForm<homeSchemaValues>({
    resolver: zodResolver(homeSchema),
    defaultValues: {
      username: "",
      category: "",
      difficulty: "",
    },
  });

  async function onSubmit(values: homeSchemaValues) {
    if (!values.username || !values.category || !values.difficulty) return;

    await fetchQuestions(values.category, values.difficulty);

    navigate("/quiz");
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-12 bg-transparent border rounded-md">
      <Card className="bg-transparent shadow-none border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-white">
            Challenge your knowledge
          </CardTitle>
          <CardDescription className="text-l text-white">
            Set your preferences and start the quiz!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-12 flex flex-col items-center w-full bg-transparent text-white"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2">
                      <User className="w-5 h-5" />
                      <FormLabel>Username</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        {...field}
                        className="w-70 bg-transparent placeholder-white/60 border border-white/30"
                        onChange={(e) => {
                          field.onChange(e);
                          setName(e.target.value);
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2">
                      <ListTree className="w-5 h-5" />
                      <FormLabel>Category</FormLabel>
                    </div>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setCategory(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-70 bg-transparent text-white border border-white/30">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.value}
                            value={String(category.value)}
                          >
                            {category.category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2">
                      <Activity className="w-5 h-5" />
                      <FormLabel>Difficulty</FormLabel>
                    </div>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setDifficulty(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-70 bg-transparent text-white border border-white/30">
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-60">
                Start Quiz
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
