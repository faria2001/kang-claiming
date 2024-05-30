// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

contract Claiming is Ownable, ReentrancyGuard {
    using SafeERC20  for IERC20;

    IERC20 private token;
    bytes32 public root;

    uint256 public tokensClaimed;

    mapping(address => bool) public IsClaimed;


    event Claimed(address indexed tokenAddress, address indexed user, uint256 amount, uint256 indexed timestamp);

    constructor(address _token, bytes32 _root) Ownable(msg.sender) {
        token = IERC20(_token);
        root = _root;
    }

    function isValid(bytes32[] memory proof, bytes32 leaf) public view returns (bool) {
       return MerkleProof.verify(proof, root, leaf);
    }

    function setRoot(bytes32 _root) external onlyOwner {
        root = _root;
    }

    function remainingRewardTokens() external view returns (uint256) {
        return Math.min(token.balanceOf(owner()), token.allowance(owner(), address(this)));
    }

    function Claim(uint256 _amount, bytes32[] memory proof) external nonReentrant {
        require(msg.sender != address(0), "CONTRACT: Caller is zero address");
        require(address(token) != address(0), "CONTRACT: Token is not set.");
        require(isValid(proof, keccak256(bytes.concat(keccak256(abi.encode(msg.sender, _amount))))), "Caller not whitelisted");

        require(!IsClaimed[msg.sender], "Already Claimed");
        
        uint256 claimAmount = _amount;
        require(claimAmount >  0, "Invalid Claim..");

        IsClaimed[msg.sender] = true;
        
        tokensClaimed = tokensClaimed + claimAmount;
        token.safeTransferFrom(owner(), msg.sender, claimAmount);

        emit Claimed(address(token), msg.sender, claimAmount, block.timestamp);
    }

}