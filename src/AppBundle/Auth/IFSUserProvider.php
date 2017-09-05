<?php


namespace AppBundle\Auth;


use HWI\Bundle\OAuthBundle\OAuth\Response\UserResponseInterface;
use HWI\Bundle\OAuthBundle\Security\Core\User\FOSUBUserProvider;
use Symfony\Component\Security\Core\User\UserInterface;

class IFSUserProvider extends FOSUBUserProvider
{

    /**
     * @url https://gist.github.com/danvbe/4476697
     * @param UserInterface $user
     * @param UserResponseInterface $response
     */
    public function connect(UserInterface $user, UserResponseInterface $response)
    {

        $property = $this->getProperty($response);
        $username = $response->getUsername(); // get the unique user identifier

        $service = $response->getResourceOwner()->getName();
        $setter = 'set'.ucfirst($service);
        $setterId = $setter.'Id';
        $setterToken = $setter.'AccessToken';

        if (null !== $previousUser = $this->userManager->findUserBy(array($property => $username))) {
            $previousUser->$setterId(null);
            $previousUser->$setterToken(null);
            $this->userManager->updateUser($previousUser);
        }
        //we connect current user
        $user->$setterId($username);
        $user->$setterToken($response->getAccessToken());
        $this->userManager->updateUser($user);
    }

    public function loadUserByOAuthUserResponse(UserResponseInterface $response)
    {
        $userId = $response->getUsername();
        $user = $this->userManager->findUserBy(array($this->getProperty($response) => $userId));

        if (null === $user) {
            $service = $response->getResourceOwner()->getName();
            $setter = 'set'.ucfirst($service);
            $setter_id = $setter.'Id';
            $setter_token = $setter.'AccessToken';
            // create new user here
            $user = $this->userManager->createUser();
            $user->$setter_id($userId);
            $user->$setter_token($response->getAccessToken());
            //I have set all requested data with the user's username
            //modify here with relevant data
            $user->setUsername($response->getNickname());
            $user->setEmail($response->getEmail());
            $user->setPassword($response->getAccessToken());
            $user->setEnabled(true);
            $this->userManager->updateUser($user);

            return $user;
        }

        $user = parent::loadUserByOAuthUserResponse($response);
        $serviceName = $response->getResourceOwner()->getName();
        $setter = 'set' . ucfirst($serviceName) . 'AccessToken';
        $user->$setter($response->getAccessToken());

        return $user;
    }

}