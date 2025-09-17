import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabins } from "../../services/apiCabins.js";
import toast from "react-hot-toast";
import { HiOutlineTrash } from "react-icons/hi2";
import {
  HiOutlineDuplicate,
  HiOutlinePencil,
  HiOutlineX,
} from "react-icons/hi";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm.jsx";
import { useDeleteCabin } from "./useDeleteCabin.js";
import { useCreateCabin } from "./useCreateCabin.js";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const DeleteButton = styled.button`
  background-color: var(--color-red-700);
  border: none;
  padding: 7px 10px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.2s;

  svg {
    width: 20px;
    height: 20px;
    color: white;
  }

  &:hover {
    background-color: var(--color-red-800);
  }
`;

const EditButton = styled.button`
  background-color: var(--color-grey-200);
  border: none;
  padding: 7px 10px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.2s;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background-color: var(--color-grey-300);
  }
`;

const DuplicateButton = styled.button`
  background-color: var(--color-brand-500);
  border: none;
  padding: 7px 10px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.2s;

  svg {
    width: 20px;
    height: 20px;
    color: white;
  }

  &:hover {
    background-color: var(--color-brand-600);
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

// eslint-disable-next-line react/prop-types
export function CabinRow({ cabin }) {
  // eslint-disable-next-line react/prop-types
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  const [showEditForm, setShowEditForm] = useState(false);

  const { isDeleting, deleteCabin } = useDeleteCabin();

  const { isCreating, createCabin } = useCreateCabin();

  function handleDuplicating() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <>
      <TableRow role={"row"}>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <Actions>
          <EditButton onClick={() => setShowEditForm((show) => !show)}>
            {showEditForm ? <HiOutlineX /> : <HiOutlinePencil />}
          </EditButton>
          <DuplicateButton disabled={isCreating} onClick={handleDuplicating}>
            <HiOutlineDuplicate />
          </DuplicateButton>
          <DeleteButton onClick={() => deleteCabin(id)} disabled={isDeleting}>
            <HiOutlineTrash />
          </DeleteButton>
        </Actions>
      </TableRow>
      {showEditForm && (
        <CreateCabinForm
          cabinToEdit={cabin}
          onClose={() => setShowEditForm(false)}
        />
      )}
    </>
  );
}
