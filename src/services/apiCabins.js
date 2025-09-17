import supabase from "./supabase.js";

//=> Read Cabins supabase query
export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("cabins are not loaded");
  }

  return cabins;
}

//=> Delete Cabin supabase query
export async function deleteCabins(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Error Deleting the cabin");
  }
}

//=> Create or Edit Cabin supabase query - with image upload
export async function createEditCabin(newCabin, id) {
  const hasImage = newCabin.image?.startsWith?.(
    import.meta.env.VITE_SUPABASE_BASE_URL,
  );

  const imageName = `${Date.now()}-${newCabin?.image?.name}`.replaceAll(
    "/",
    "",
  );

  const imagePath = hasImage
    ? newCabin.image
    : `${import.meta.env.VITE_SUPABASE_BASE_URL}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  if (!id)
    query = query
      .insert([{ ...newCabin, image: imagePath }])
      .select()
      .single();

  const { data, error } = await query;

  if (error) {
    let errmsg;
    if (id) errmsg = "Error Updating cabin info";
    else errmsg = "Error Creating new cabin";
    console.error(errmsg);
    console.log(error);
    throw new Error(errmsg);
  }

  if (hasImage && id) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", id);
    console.error(storageError);
    throw new Error("Error Uploading Image");
  }

  return data;
}
