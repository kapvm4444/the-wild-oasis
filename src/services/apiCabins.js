import supabase from "./supabase.js";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("cabins are not loaded");
  }

  return cabins;
}

export async function deleteCabins(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Error Deleting the cabin");
  }
}

export async function createCabin(newCabin) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([newCabin])
    .select()
    .single();

  if (error) {
    console.error("Error Creating new cabin");
    throw new Error("Error Creating new cabin");
  }

  return data;
}
