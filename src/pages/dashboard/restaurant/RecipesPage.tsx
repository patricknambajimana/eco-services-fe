import { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  RefreshCw,
  BookOpen,
  Clock,
  DollarSign,
  ChefHat,
  Flame,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useRecipes } from '@/hooks/kitchen/useRecipes';
import { RECIPE_CATEGORY_LABELS } from '@/constants/restaurant';
import { Recipe, RecipeIngredient, RecipeStep } from '@/types/restaurant.types';
import { cn } from '@/lib/utils';

export const RecipesPage = () => {
  const { 
    recipes, 
    selectedRecipe, 
    setSelectedRecipe,
    isLoading,
    createRecipe,
    updateRecipe,
    deleteRecipe 
  } = useRecipes();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<Recipe>>({
    name: '',
    category: 'MAIN_COURSE',
    description: '',
    ingredients: [],
    steps: [],
    cookingTimeMinutes: 0,
    prepTimeMinutes: 0,
    requiredEquipment: [],
    yield: 1,
    yieldUnit: 'SERVINGS',
    dietaryTags: [],
    costPerServing: 0,
    profitMargin: 0,
  });

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || recipe.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setFormData(recipe);
    setIsDialogOpen(true);
  };

  const handleView = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsViewDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setRecipeToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (recipeToDelete) {
      await deleteRecipe(recipeToDelete);
      setIsDeleteDialogOpen(false);
      setRecipeToDelete(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRecipe) {
      await updateRecipe(selectedRecipe.id, formData);
    } else {
      await createRecipe(formData as Omit<Recipe, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'createdByName'>);
    }
    setIsDialogOpen(false);
    setSelectedRecipe(null);
    setFormData({
      name: '',
      category: 'MAIN_COURSE',
      description: '',
      ingredients: [],
      steps: [],
      cookingTimeMinutes: 0,
      prepTimeMinutes: 0,
      requiredEquipment: [],
      yield: 1,
      yieldUnit: 'SERVINGS',
      dietaryTags: [],
      costPerServing: 0,
      profitMargin: 0,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recipes</h1>
          <p className="text-gray-500">Manage kitchen recipes and ingredients</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button className="bg-restaurant-600 hover:bg-restaurant-700" onClick={() => { setSelectedRecipe(null); setIsDialogOpen(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            New Recipe
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Recipes</p>
              <p className="text-xl font-bold">{recipes.length}</p>
            </div>
            <BookOpen className="h-6 w-6 text-restaurant-500" />
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Categories</p>
              <p className="text-xl font-bold">{Object.keys(RECIPE_CATEGORY_LABELS).length}</p>
            </div>
            <ChefHat className="h-6 w-6 text-restaurant-500" />
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Avg Prep Time</p>
              <p className="text-xl font-bold">
                {recipes.length > 0 ? Math.round(recipes.reduce((sum, r) => sum + r.prepTimeMinutes, 0) / recipes.length) : 0}m
              </p>
            </div>
            <Clock className="h-6 w-6 text-restaurant-500" />
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Avg Cost</p>
              <p className="text-xl font-bold">
                ${recipes.length > 0 ? (recipes.reduce((sum, r) => sum + r.costPerServing, 0) / recipes.length).toFixed(2) : '0.00'}
              </p>
            </div>
            <DollarSign className="h-6 w-6 text-restaurant-500" />
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search recipes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {Object.entries(RECIPE_CATEGORY_LABELS).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Recipes Table */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Recipe</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Prep Time</TableHead>
                <TableHead>Cook Time</TableHead>
                <TableHead>Cost/Serving</TableHead>
                <TableHead>Yield</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecipes.map((recipe) => (
                <TableRow key={recipe.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">{recipe.name}</p>
                      {recipe.description && (
                        <p className="text-sm text-gray-500 truncate max-w-[200px]">{recipe.description}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {RECIPE_CATEGORY_LABELS[recipe.category]}
                    </Badge>
                  </TableCell>
                  <TableCell>{recipe.prepTimeMinutes} min</TableCell>
                  <TableCell>{recipe.cookingTimeMinutes} min</TableCell>
                  <TableCell>${recipe.costPerServing.toFixed(2)}</TableCell>
                  <TableCell>
                    {recipe.yield} {recipe.yieldUnit.toLowerCase()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handleView(recipe)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(recipe)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDelete(recipe.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredRecipes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No recipes found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedRecipe ? 'Edit Recipe' : 'Create New Recipe'}</DialogTitle>
            <DialogDescription>
              {selectedRecipe ? 'Update recipe details' : 'Add a new recipe to the kitchen'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Recipe Name *</Label>
                  <Input 
                    id="name" 
                    value={formData.name || ''} 
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Grilled Salmon"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select 
                    value={formData.category || 'MAIN_COURSE'} 
                    onValueChange={(value) => setFormData({ ...formData, category: value as Recipe['category'] })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(RECIPE_CATEGORY_LABELS).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={formData.description || ''} 
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the recipe"
                  rows={2}
                />
              </div>

              {/* Time & Yield */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prepTime">Prep Time (min)</Label>
                  <Input 
                    id="prepTime" 
                    type="number" 
                    value={formData.prepTimeMinutes || 0} 
                    onChange={(e) => setFormData({ ...formData, prepTimeMinutes: parseInt(e.target.value) || 0 })}
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cookTime">Cook Time (min)</Label>
                  <Input 
                    id="cookTime" 
                    type="number" 
                    value={formData.cookingTimeMinutes || 0} 
                    onChange={(e) => setFormData({ ...formData, cookingTimeMinutes: parseInt(e.target.value) || 0 })}
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yield">Yield</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="yield" 
                      type="number" 
                      value={formData.yield || 1} 
                      onChange={(e) => setFormData({ ...formData, yield: parseInt(e.target.value) || 1 })}
                      min="1"
                      className="flex-1"
                    />
                    <Select 
                      value={formData.yieldUnit || 'SERVINGS'} 
                      onValueChange={(value) => setFormData({ ...formData, yieldUnit: value as Recipe['yieldUnit'] })}
                      className="w-32"
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SERVINGS">Servings</SelectItem>
                        <SelectItem value="PIECES">Pieces</SelectItem>
                        <SelectItem value="BATCHES">Batches</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Cost */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cost">Cost per Serving ($)</Label>
                  <Input 
                    id="cost" 
                    type="number" 
                    step="0.01"
                    value={formData.costPerServing || 0} 
                    onChange={(e) => setFormData({ ...formData, costPerServing: parseFloat(e.target.value) || 0 })}
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profit">Profit Margin ($)</Label>
                  <Input 
                    id="profit" 
                    type="number" 
                    step="0.01"
                    value={formData.profitMargin || 0} 
                    onChange={(e) => setFormData({ ...formData, profitMargin: parseFloat(e.target.value) || 0 })}
                    min="0"
                  />
                </div>
              </div>

              {/* Equipment */}
              <div className="space-y-2">
                <Label>Required Equipment</Label>
                <Input 
                  placeholder="Separate with commas (e.g., Grill, Sauté Pan, Spatula)"
                  value={(formData.requiredEquipment || []).join(', ')}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    requiredEquipment: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                />
              </div>

              {/* Dietary Tags */}
              <div className="space-y-2">
                <Label>Dietary Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {['VEGETARIAN', 'VEGAN', 'GLUTEN_FREE', 'DAIRY_FREE', 'NUT_FREE', 'KETO'].map((tag) => (
                    <Badge 
                      key={tag}
                      variant={(formData.dietaryTags || []).includes(tag as any) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => {
                        const tags = formData.dietaryTags || [];
                        if (tags.includes(tag as any)) {
                          setFormData({ ...formData, dietaryTags: tags.filter(t => t !== tag) });
                        } else {
                          setFormData({ ...formData, dietaryTags: [...tags, tag as any] });
                        }
                      }}
                    >
                      {tag.replace(/_/g, ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-restaurant-600 hover:bg-restaurant-700" disabled={isLoading}>
                {isLoading ? 'Saving...' : selectedRecipe ? 'Update Recipe' : 'Create Recipe'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Recipe Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedRecipe && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedRecipe.name}</DialogTitle>
                <DialogDescription>
                  <Badge variant="outline">{RECIPE_CATEGORY_LABELS[selectedRecipe.category]}</Badge>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {selectedRecipe.description && (
                  <p className="text-gray-600">{selectedRecipe.description}</p>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-500">Prep Time</p>
                    <p className="font-medium">{selectedRecipe.prepTimeMinutes} min</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Cook Time</p>
                    <p className="font-medium">{selectedRecipe.cookingTimeMinutes} min</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Yield</p>
                    <p className="font-medium">{selectedRecipe.yield} {selectedRecipe.yieldUnit.toLowerCase()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Cost/Serving</p>
                    <p className="font-medium">${selectedRecipe.costPerServing.toFixed(2)}</p>
                  </div>
                </div>

                {selectedRecipe.ingredients.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Ingredients</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedRecipe.ingredients.map((ing) => (
                        <li key={ing.id} className="text-sm text-gray-600">
                          {ing.quantity} {ing.unit} {ing.name}
                          {ing.substitute && <span className="text-xs text-gray-400"> (sub: {ing.substitute})</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedRecipe.steps.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Steps</h4>
                    <ol className="list-decimal list-inside space-y-2">
                      {selectedRecipe.steps.map((step) => (
                        <li key={step.id} className="text-sm text-gray-600">
                          {step.instruction}
                          {step.durationMinutes && (
                            <span className="text-xs text-gray-400 ml-2">({step.durationMinutes} min)</span>
                          )}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {selectedRecipe.requiredEquipment.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Equipment</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedRecipe.requiredEquipment.map((eq) => (
                        <Badge key={eq} variant="outline">{eq}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedRecipe.dietaryTags.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Dietary Information</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedRecipe.dietaryTags.map((tag) => (
                        <Badge key={tag} className="bg-green-100 text-green-700">{tag.replace(/_/g, ' ')}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-xs text-gray-400 border-t pt-2">
                  Created by {selectedRecipe.createdByName} on {new Date(selectedRecipe.createdAt).toLocaleDateString()}
                </div>
              </div>
            </>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Recipe</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this recipe? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-3 py-4">
            <AlertCircle className="h-6 w-6 text-red-500" />
            <p className="text-sm text-gray-600">
              All associated data including ingredients and steps will be permanently removed.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={isLoading}>
              {isLoading ? 'Deleting...' : 'Delete Recipe'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};