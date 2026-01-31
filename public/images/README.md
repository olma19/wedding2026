# Images Folder

Place your wedding images here.

## How to use images

1. **Add your images** to this folder (e.g., `hero.jpg`, `toastmaster-john.jpg`).

2. **Reference them in config** (`config/wedding.ts`):
   - Hero image: Set `hero.imageUrl = '/images/hero.jpg'`
   - Toastmaster photos: Set `toastmaster.people[].imageUrl = '/images/toastmaster-name.jpg'`

3. **Path format**: Always start with `/` (e.g., `/images/filename.jpg`)

## Image recommendations

- **Hero image**: Large, high-quality photo (1920x1080 or larger recommended)
- **Toastmaster photos**: Square or portrait photos work best (400x400px or larger)
- **Formats**: JPG or PNG are both fine
- **Optimization**: Next.js will automatically optimize images when you use the `Image` component (already implemented)

## Example structure

```
public/images/
  hero.jpg
  toastmaster-john.jpg
  toastmaster-jane.jpg
```
