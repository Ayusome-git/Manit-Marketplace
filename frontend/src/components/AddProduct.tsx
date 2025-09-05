import { Form } from "react-router-dom";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import axios from "axios";

export function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [productCondition, setProductCondition] = useState("");
  const [category, setCategory] = useState("");


  async function addProduct() {
    try{
        const response=await axios.post("http://localhost:3000/product",{
            name,
            description,
            category,
            price,
            productCondition
        },{
            headers:{
                authorization:localStorage.getItem("token")
            }
        })
        alert("blog added")
    }catch(e){
        alert("blog failed")
    }
  }
  return (
    <div>
        <Card className="p-5">
          <div className="flex gap-5 ">
            <Input
              type="text"
              className="w-md"
              placeholder="Product Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            ></Input>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Product Category</SelectLabel>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="stationary">Stationary</SelectItem>
                  <SelectItem value="appliances">Appliances</SelectItem>
                  <SelectItem value="cycle">Cycle</SelectItem>
                  <SelectItem value="bike">Bike</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="">
            <Textarea
              placeholder="Enter the product description"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
            ></Textarea>
          </div>
          <div className="flex">
            <Input
              placeholder="price"
              type="number"
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
            ></Input>
            <Select value={productCondition} onValueChange={setProductCondition}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Product Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Product Condition</SelectLabel>
                  <SelectItem value="used">Used</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="refurbished">Refurbished</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Button onClick={()=>addProduct()}>Submit</Button>
          </div>
        </Card>
    </div>
  );
}
