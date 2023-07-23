import Button from "@/components/common/Button";
import useCheckIfVaultExists from "@/hooks/useCheckIfVaultExists";
import useInitVault from "@/hooks/useInitVault";
import { toast } from "react-toastify";

const EmptyPosts = () => {
  const { initVault, isLoading: initVaultLoading } = useInitVault();
  const {
    data: vaultData,
    isLoading: checkVaultLoading,
    error: vaultError,
    refetch: checkIfVaultExists,
  } = useCheckIfVaultExists();

  const onInitClick = async () => {
    try {
      await initVault();
      await checkIfVaultExists();
      toast.success("Vault created!");
    } catch (err) {
      toast.error("Error creating a vault!");
    }
  };

  if (checkVaultLoading) {
    return (
      <div className="prose mx-auto text-center mt-10">
        <p>Loading ...</p>
      </div>
    );
  }

  if (vaultError) {
    return (
      <div className="prose mx-auto text-center mt-10">
        <p>Error checking if the vault exists!</p>
      </div>
    );
  }

  if (vaultData.hasVault) {
    return (
      <div className="prose mx-auto text-center mt-10">
        <h3>This user contains a vault!</h3>
      </div>
    );
  }

  return (
    <div className="prose mx-auto text-center mt-10">
      <h3>There no vault created for this user!</h3>
      <p>Click on the button below to create one ...</p>
      <Button
        isLoading={initVaultLoading}
        className="btn-primary"
        onClick={onInitClick}
      >
        Create Vault
      </Button>
    </div>
  );
};

export default EmptyPosts;
