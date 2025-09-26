import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { Sprout } from 'lucide-react';
import { Combobox } from './ui/combo-box';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Input } from "./ui/input";
import { createPlant } from '@/actions/plant.action';
import toast from 'react-hot-toast';


function CreateDialog() {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        stock: 1,
        price: 1,
        category: "",
        userId: "",
        imageUrl: "",
      });

      const handleChange = (field: string, value: string | number) => {
        setFormData({ ...formData, [field]: value });
      };

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const newPlant = await createPlant(formData);
          console.log("plant created: ", newPlant);
          toast.success("Plant created successfully");
        } catch (error) {
          console.error("error creating plant", error);
          toast.error("Failed to create plant");
        }
      };


  
        return (
          <AlertDialog>
            <AlertDialogTrigger asChild>

              <Button variant="default" className='ml-auto flex items-center gap-2' asChild>
                <span>
                    <Sprout className='w-4 h-4'/>
                    Add Plant
                </span>

              </Button>


            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Add a Plant</AlertDialogTitle>
                <AlertDialogDescription>
                  Fill form to add new plant
                </AlertDialogDescription>
              </AlertDialogHeader>

              <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Combobox
                value={formData.category}
                onChange={(val) => handleChange("category", val)}
              />
            </div>
          </div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Type your message here."
            rows={5}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                placeholder="Enter stock quantity"
                value={formData.stock}
                onChange={(e) => handleChange("stock", Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter price"
                value={formData.price}
                onChange={(e) => handleChange("price", Number(e.target.value))}
              />
            </div>
          </div>


              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction type='submit'>Submit</AlertDialogAction>
              </AlertDialogFooter>
              </form>

            </AlertDialogContent>
          </AlertDialog>
        )
      }
      


export default CreateDialog;
