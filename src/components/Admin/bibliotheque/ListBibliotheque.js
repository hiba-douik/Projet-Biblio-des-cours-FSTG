import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

function ListBibliotheque() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLibrary, setSelectedLibrary] = useState({ nom: '', location: '' });

  const handleModalOpen = (library) => {
    setSelectedLibrary(library);
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setSelectedLibrary(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted library:', selectedLibrary);
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar component would go here */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar component would go here */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <Card>
              <CardHeader className="bg-primary text-white rounded-t-lg">
                <CardTitle>Authors Table</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b">
                        <th className="px-4 py-3">Author</th>
                        <th className="px-4 py-3">Function</th>
                        <th className="px-4 py-3 text-center">Status</th>
                        <th className="px-4 py-3 text-center">Employed</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src="../assets/img/team-2.jpg" alt="User" />
                              <AvatarFallback>JM</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold">John Michael</p>
                              <p className="text-xs text-gray-600">john@creative-tim.com</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-semibold text-sm">Manager</p>
                          <p className="text-xs text-gray-600">Organization</p>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Badge variant="success">Online</Badge>
                        </td>
                        <td className="px-4 py-3 text-center text-sm">23/04/18</td>
                        <td className="px-4 py-3">
                          <Button 
                            variant="ghost" 
                            onClick={() => handleModalOpen({ nom: 'John Michael', location: 'Location 1' })}
                          >
                            Edit
                          </Button>
                        </td>
                      </tr>
                      {/* Add more rows as needed */}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Modifier Bibliothèque</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="nom">Nom</Label>
                    <Input
                      type="text"
                      id="nom"
                      name="nom"
                      value={selectedLibrary.nom}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="location">Emplacement</Label>
                    <Input
                      type="text"
                      id="location"
                      name="location"
                      value={selectedLibrary.location}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Submit</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ListBibliotheque;