<template>
  <div>
    <UiDialog v-model:open="open">
      <UiDialogContent class="max-w-[400px]" :title="title" :description="description">
        <template #content>
          <form @submit="submit">
            <fieldset :disabled="isSubmitting" class="grid gap-5">
              <UiVeeInput name="name" label="یادآوری" />
              <UiVeeInput name="age" label="زمان" type="number" />
              <UiButton type="submit" class="w-full">
                {{ buttonText }}
              </UiButton>
            </fieldset>
          </form>
        </template>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
  import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
  import type { Pet } from "~/types";

  const collectionName = "pets";

  const props = defineProps<{
    pet?: Pet;
  }>();

  const isEditing = computed(() => !!props.pet);
  const db = useFirestore();
  const user = useCurrentUser();

  const title = computed(() => (isEditing.value ? "Edit pet" : "ایجاد یادآوری"));
  const description = computed(() => (isEditing.value ? "Edit your pet" : "ایجاد یادآوری جدید"));
  const buttonText = computed(() => (isEditing.value ? "Update" : "ثبت"));

  const open = defineModel({ default: false });

  const { handleSubmit, isSubmitting, setValues, resetForm } = useForm({
    validationSchema: toTypedSchema(PetSchema),
    initialValues: props.pet ?? {},
  });
  const submit = handleSubmit(async (values) => {
    if (isEditing.value) {
      // update ref
      const petRef = doc(db, collectionName, props.pet?.id!);
      await updateDoc(petRef, {
        name: values.name,
        age: values.age,
        updatedAt: new Date().toISOString(),
      });
      useSonner.success("یادآوری با موفقیت به روز رسانی شد.");
    } else {
      // create ref
      const petRef = doc(collection(db, collectionName));
      await setDoc(petRef, {
        ...values,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: user.value?.uid,
      });
      useSonner.success("یادآوری با موفقیت ایجاد گردید");
    }
    open.value = false;
  });
  watch(open, (v) => {
    if (v) {
      if (isEditing.value) {
        setValues(props.pet ?? {});
      }
    } else {
      resetForm();
    }
  });


</script>