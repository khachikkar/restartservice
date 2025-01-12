    // Handle form submission
    // const handleSubmit = async (e: FormEvent) => {
    //     e.preventDefault()
    //     setLoading(true)
    //
    //     try {
    //         const { title, price, image } = formData
    //         if (!title || price <= 0 || !image) {
    //             alert('All fields are required, and price must be greater than 0.')
    //             setLoading(false)
    //             return
    //         }
    //
    //         // Upload image to Supabase Storage
    //         const imageFileName = `${Date.now()}-${image.name}`
    //         const { data: uploadData, error: uploadError } = await supabase.storage
    //             .from('crypto1') // Replace with your storage bucket name
    //             .upload(imageFileName, image)
    //
    //         if (uploadError) throw uploadError
    //
    //         const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/crypto1/${uploadData.path}`
    //
    //         // Insert NFT details into the database
    //         const { data, error } = await supabase
    //             .from('nfts') // Replace with your table name
    //             .insert([{ title, price, image: imageUrl }])
    //
    //         console.log(data, "data")
    //         if (error) throw error
    //
    //         alert('NFT added successfully!')
    //         setFormData({ title: '', price: 0, image: null })
    //     } catch (error: unknown) {
    //         console.error('Error adding NFT:', (error as Error).message)
    //         alert('Failed to add NFT. Check console for details.')
    //     } finally {
    //         setLoading(false)
    //     }
    // }


1. sarqum enq bucket y public
2. grum enq policiner pucket i vra
3. grum enq policiner table i vra



//popoxel data uxarkelu functionnery avelacnel mi 2 ban , vor api requesty chisht gna, kazmakerpel nor componenty  vor chisht nsten 