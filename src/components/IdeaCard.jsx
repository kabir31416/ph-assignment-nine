"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Tag, Wallet, Pencil, Trash2 } from "lucide-react";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";

export default function IdeaCard({
  idea,
  onUpdate,
  onDelete,
  showActions = false,
}) {
  const {
    _id,
    title,
    shortDescription,
    category,
    imageUrl,
    budget,
    username,
    userImage,
  } = idea;

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [formData, setFormData] = useState({
    title,
    shortDescription,
    category,
    budget,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (onUpdate) {
      await onUpdate(_id, formData);
    }

    setIsEditOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (onDelete) {
      await onDelete(_id);
    }

    setIsDeleteOpen(false);
  };

  return (
    <div className="group bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-gray-800 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 overflow-hidden flex flex-col justify-between">

      {/* Image */}
      <div>
        <div className="relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            width={400}
            height={224}
            className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
          />

          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-yellow-500 text-white text-xs font-medium shadow z-10">
            {category}
          </span>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white line-clamp-1">
            {title}
          </h3>

          <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2">
            {shortDescription}
          </p>

          <div className="mt-5 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Tag size={16} className="text-yellow-600" />
              <span>{category}</span>
            </div>

            <div className="flex items-center gap-2">
              <Wallet size={16} className="text-yellow-600" />
              <span>${budget}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">

          {/* User */}
          <div className="flex items-center gap-3">
            <Image
              src={userImage || "https://i.pravatar.cc/150"}
              alt={username || "Anonymous"}
              width={28}
              height={28}
              className="w-7 h-7 rounded-full object-cover"
            />
            <span className="text-sm text-gray-600 dark:text-gray-300 font-medium line-clamp-1">
              {username || "Anonymous"}
            </span>
          </div>

          {/* Edit/Delete Buttons */}
          {showActions && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsEditOpen(true)}
                className="p-2 rounded-xl bg-gray-100 hover:bg-blue-50 dark:bg-gray-800 dark:hover:bg-blue-950/30 text-blue-600 transition"
              >
                <Pencil size={16} />
              </button>

              <button
                type="button"
                onClick={() => setIsDeleteOpen(true)}
                className="p-2 rounded-xl bg-gray-100 hover:bg-red-50 dark:bg-gray-800 dark:hover:bg-red-950/30 text-red-600 transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>

        {/* View Details */}
        <div className="mt-4 pt-2">
          <Link
            href={`/ideas/${_id}`}
            className="inline-flex items-center gap-2 text-yellow-600 font-semibold hover:gap-3 transition text-sm"
          >
            View Details
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
          <Modal.Backdrop>
            <Modal.Container placement="auto">
              <Modal.Dialog className="sm:max-w-md">
                <Modal.CloseTrigger onClick={() => setIsEditOpen(false)} />

                <Modal.Header>
                  <Modal.Icon className="bg-yellow-100 text-yellow-600">
                    <Pencil className="size-5" />
                  </Modal.Icon>

                  <Modal.Heading>Update Your Idea</Modal.Heading>

                  <p className="mt-1.5 text-sm text-muted">
                    Modify your idea details below.
                  </p>
                </Modal.Header>

                <Modal.Body className="p-6">
                  <Surface>
                    <form
                      onSubmit={handleUpdateSubmit}
                      className="flex flex-col gap-4"
                    >
                      <TextField>
                        <Label>Idea Title</Label>
                        <Input
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                        />
                      </TextField>

                      <TextField>
                        <Label>Category</Label>
                        <Input
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                        />
                      </TextField>

                      <TextField>
                        <Label>Budget</Label>
                        <Input
                          type="number"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          required
                        />
                      </TextField>

                      <TextField>
                        <Label>Short Description</Label>
                        <Input
                          name="shortDescription"
                          value={formData.shortDescription}
                          onChange={handleInputChange}
                          required
                        />
                      </TextField>

                      <div className="flex justify-end gap-2 pt-4">
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => setIsEditOpen(false)}
                        >
                          Cancel
                        </Button>

                        <Button
                          type="submit"
                          className="bg-yellow-500 text-white"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </Surface>
                </Modal.Body>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      )}

      {/* Delete Modal */}
      {isDeleteOpen && (
        <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
          <Modal.Backdrop>
            <Modal.Container placement="auto">
              <Modal.Dialog className="sm:max-w-sm">
                <Modal.CloseTrigger onClick={() => setIsDeleteOpen(false)} />

                <Modal.Header>
                  <Modal.Icon className="bg-red-100 text-red-600">
                    <Trash2 className="size-5" />
                  </Modal.Icon>

                  <Modal.Heading>Delete Idea?</Modal.Heading>

                  <p className="mt-1.5 text-sm text-muted">
                    This action cannot be undone.
                  </p>
                </Modal.Header>

                <Modal.Footer className="flex justify-end gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => setIsDeleteOpen(false)}
                  >
                    Cancel
                  </Button>

                  <Button
                    className="bg-red-600 text-white"
                    onClick={handleDeleteConfirm}
                  >
                    Delete
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      )}
    </div>
  );
}