pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";



contract MemoryToken is ERC721PresetMinterPauserAutoId {
    using SafeMath for uint256;
    constructor() ERC721PresetMinterPauserAutoId("MemoryToken", "MEM", "https://google.com/metadata") {}
    
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    return string(abi.encodePacked(super.tokenURI(tokenId),".json"));
    }

    function mint(address _to, string memory _tokenURI) public returns(bool) {
        uint _tokenId = totalSupply().add(1);
        _mint(_to, _tokenId);
        // _baseTokenURI(_tokenId, _tokenURI);
        return true;
    }
    }

//     function mint(address _to, string memory _tokenURI) public returns(bool) {
//        uint _tokenId = totalSupply().add(1);
//        _mint(_to, _tokenId);
//        _setTokenURI(_tokenId, _tokenURI);
//        return true;
//     }
// }
